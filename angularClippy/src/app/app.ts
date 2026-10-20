import { Component, signal } from '@angular/core';
import { CreateMLCEngine, MLCEngine, ChatCompletionMessageParam, InitProgressReport } from "@mlc-ai/web-llm";

//Angular materials style imports 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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

  constructor(){
    this.initEngine();
  }

  //initEngine() function: Initializes engine and unlocks UI
  async initEngine(){
    /*const initProgressCallback = (progress: any) => { //the tutorial doesnt specify what data type progress is so lets assume it any
      console.log("Model loading progress:", progress.text); //progress is readable txt string from webllm 
      this.loadingMessage = progress.text;

      //LOOK AT MY CHANGES LOOK AT MY CHANGES
      this.cdr.detectChanges();
    };*/
    try {
      this.engine = await CreateMLCEngine('Qwen2.5-1.5B-Instruct-q4f32_1-MLC', {
        initProgressCallback: (progress: InitProgressReport) => {
          this.loadingMessage.set(progress.text); //since we're working with signals, reminder that we need to use .set to change values within the signal because the signal is actually a separate object
        }
      });

      // after load, unlock UI by manually changing variables 
      this.isLoading.set(false);
      this.loadingMessage.set("Type your request here...");

      /*this.cdr.detectChanges();*/
    } catch (err) {
      console.error(err);
      this.loadingMessage.set("Error loading model.");

      /*this.cdr.detectChanges();*/
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
    const historyForApi: ChatCompletionMessageParam[] = [
      ...this.messages(), 
      { role: 'user', content: prompt }
    ]; 

    /*    //since we changed to signals we dont want to push we want to literally replace the array 
    this.messages.push({ role: 'user', content: prompt }); */

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
      for await (const chunk of chunks) {
        reply += chunk.choices[0]?.delta?.content || "";
        
        //update ONLY the current streaming message
        this.messages.update(m =>
          m.map((msg, i) => i === botMessageIndex ? { ...msg, content: reply } : msg)
        );

        /*this.cdr.detectChanges()*/
      }
    } catch (err) {
      console.error(err);

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