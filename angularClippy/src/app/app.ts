import { Component, signal, inject } from '@angular/core';
import { CreateMLCEngine, MLCEngine, ChatCompletionMessageParam, InitProgressReport } from "@mlc-ai/web-llm";

//Angular materials style imports 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

//Dev Team's imports 
import { Kb } from './kb.service'; 

//UPDATE (10/15/2026): Ok, so some analysis from Liebel's work has been done and we can use signal instead. ChangeDetectorRef was the older solution 
//signal instead is like built-in tracking where you would use to have to tell ChangeDetector to manually go find it 
//i think liebel used readonlys as a formal documentation thing, but i also looked up that its specifically for non-changing values

@Component({
  selector: 'app-root',
  imports: [    
      MatButtonModule,
      MatIconModule,
      MatListModule,
      MatFormFieldModule,
      MatInputModule,
      MatProgressBarModule,
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { 
  //note that signal syntax has = signal and NOT : signal, the type that will be signaled should be encapsed in <>
  readonly userMessage = signal<string>('');
  readonly isLoading = signal<boolean>(true);
  readonly loadingMessage = signal<string>('Loading model into browser history...')

  //First item in messages will be assistant's first greeting..
  readonly messages = signal<ChatCompletionMessageParam[]>([
    { role: 'assistant', content: 'Hello! I am ready. Type your request below and WebLLM will respond.' }
  ]);

  private engine?: MLCEngine;
  private kb = inject(Kb);

  constructor(){
    this.initEngine();

    /*
      THE NEXT 3 LINES ARE MOSTLY FOR DEBUGGING, DELETE AFTER SUCCESSFUL INTEGRATION
    */
      //load the knowledge base
      this.kb.load().then(() => {
      const records = this.kb.getRecords();
      
      console.log(`Successfully parsed ${records.length} records!`);
    });
  }

  //initEngine() function: Initializes engine and unlocks UI
  async initEngine(){
    try {
      this.engine = await CreateMLCEngine('Qwen2.5-1.5B-Instruct-q4f32_1-MLC', {
        initProgressCallback: (progress: InitProgressReport) => {
          this.loadingMessage.set(progress.text); //since we're working with signals, reminder that we need to use .set to change values within the signal because the signal is actually a separate object
        }
      });

      // after load, unlock UI by manually changing variables 
      this.isLoading.set(false);
      this.loadingMessage.set("Type your request here...");

    } catch (err) {
      console.error(err);
      this.loadingMessage.set("Error loading model.");

    }
  }

  //sendMessage() function: takes in user input and then get assistant to generate a reply
  async sendMessage(){
    //Take in user input, return if user doesn't send anything, engine doesn't load, or if a response is loading.
    const prompt = this.userMessage().trim();
    if (!prompt || !this.engine || this.isLoading()){
      return;
    }

    //Clear user input and lock UI
    this.userMessage.set('');
    this.isLoading.set(true);

    //it took me 30 minutes to realize that the later chunks chat completion was actually eating the ai placeholder message and NOT the latest user message
    /*
      historyForApi holds convo history, webllm will not understand previous context without it!
      the type is set as ChatCompletionMessageParam[] as that is what is expected in messages portion of .chat.completions.create
      this is just an array holding {role: content: }s, including all previous messages.

      TO DEV WORKING ON KB INTEGRATION: I would maybe get KB records before this line and then establish it as a {role: system, content: }?
      **From what it looks like to me, system role would be where you'd set up prior knowledge/rules.
    */
    const historyForApi: ChatCompletionMessageParam[] = [
      ...this.messages(), 
      { role: 'user', content: prompt }
    ]; 

    //the LM is streaming its response so if its saying something like "Hello there!" its actually -> "Hello" -> "there" -> "!" and just keeps going 
    const botMessageIndex = this.messages().length + 1;

    //append both user and assistant responses to messages array 
    this.messages.update(m => [
      ...m,
      { role: 'user', content: prompt },
      { role: 'assistant', content: '' }
    ])

    try {
      const chunks = await this.engine.chat.completions.create({
        messages: historyForApi, //THIS USED TO BE this/messages BUT THAT JUST HAS THE EMPTY PLACEHOLDER^^^^^^
        temperature: 1,
        stream: true,
        stream_options: { include_usage: true },
      });

      let reply = "";

      /*
        WebLLM generates in chunks as stated above for botMessageIndex, so I decided to make a for/await loop
        that iterates through each chunk and stick it into the reply variable for a full response.
      */
      for await (const chunk of chunks) {
        //as the for loop iterates through each chunk, reply is appending each part of the chunk into the reply.
        //chunk.choices[0]? = First choice from WebLLM (WebLLM responses are in a choices[] array)
        //delta?.content = the specific text generated in a singular chunk  
        //the ? were added in case it runs into chunks with undefined properties that .content cant read (ret undefined instead of TypeError).
        reply += chunk.choices[0]?.delta?.content || "";

        //specifically places the reply into the most recent index (which should always be on assistant's turn)
        this.messages.update(m =>
          m.map((msg, i) => i === botMessageIndex ? { ...msg, content: reply } : msg)
        );

      }
    } catch (err) {
      console.error(err);

      //I havent actually tested the error message yet but assistant should reply "Error generating response" as latest message if it had an error generating response
      this.messages.update(m =>
        m.map((msg, i) =>
          i === botMessageIndex ? { ...msg, content: 'Error generating response.' } : msg
        )
      );
    } finally {
      this.isLoading.set(false);
    }

  }

}