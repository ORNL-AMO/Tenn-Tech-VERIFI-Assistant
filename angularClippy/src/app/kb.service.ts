import { Injectable } from '@angular/core';

//Interfaces = object blueprints 
//This should be in the same format as starter=corpus.md
export interface KbRecord {
  id: string;
  title: string;
  category: string;
  status: string;
  appliesTo: string;
  intents: string[];
  keywords: string[];
  safety: string;
  answer: string;
  limitations?: string;
  warning?: string;
  sources: string[];
}

@Injectable({ providedIn: 'root' })
export class Kb {
  //Load in the corpus.md
  private readonly CORPUS_URL = 'knowledge-base/starter-corpus.md';

  //Goal of records is to split the entire corpus into chunks
  private records: KbRecord[] = [];
  private loaded = false;

  //Load in the markdown file
  async load(): Promise<void> {
    //return if kb is already loaded
    if (this.loaded){
        return;
    } 

    //otherwise, load kb
    const res = await fetch(this.CORPUS_URL);
    if (!res.ok) {
      throw new Error(
        `Corpus fetch failed: ${res.status} ${res.statusText} (${this.CORPUS_URL})`
      );
    }

    //raw text from md file
    const markdown = await res.text(); 

    //parse markdown file then set loaded as true
    this.records = this.parseMarkdown(markdown);
    this.loaded = true;
  }

  //Record Getter
  getRecords(): readonly KbRecord[] {
    return this.records;
  }

  private parseMarkdown(md: string): KbRecord[] {
    //split md into blocks -- each block starts at '## KB-' until next '## ' or eof 
    const blocks = md.split(/^## /m).slice(1);

    const records: KbRecord[] = [];
    let category = '';

    for (const block of blocks){
      //first line of block should always be the heading
      const heading = block.split('\n')[0].trim();

      //match for 'KB-XXXX-## - Title' ...matches separated by () within regex!
      //\s+—\s+ -> separator (white space or em dash)
      const recMatch = heading.match(/^(KB-[A-Z]+-\d+)\s+—\s+(.+)$/);

      //if it aint a kb title then it has to be a category heading
      if (!recMatch){
        category = heading;
        continue;
      }

      //(KB-[A-Z]+-\d+) -> KB-XXXX-## -> recMatch[1] 
      const id = recMatch[1]
      //(.+) -> Whatever is after separator (Title) -> recMatch[2]
      const title = recMatch[2]

      /*

      ## KB-SETUP-02 — First startup

      THIS PART:
        - **Status:** Reviewed
        - **Applies to:** VERIFI v0; web and desktop
        - **User intents:** “I just opened VERIFI. What should I do first?”, “Can I start from a backup or sample data?”
        - **Keywords:** welcome, first time, create account, backup, sample data, contact
        - **Safety:** Normal

          m[0] -> "- **Status:** Reviewed"
          m[1] -> "Status"
          m[2] -> "Reviewed"

          recView["status"] = "Reviewed"
      
      */
      const recView: Record<string, string> = {};
      for (const m of block.matchAll(/^- \*\*([^*]+):\*\*\s*(.*)$/gm)) {
        recView[m[1].trim().toLowerCase()] = m[2].trim();
      }

      /*
      ### Customer-reviewed answer

      blah blah blah
      blah blah blah

          m[0] -> the whole thing
          m[1] -> ### customer-reviewed answer
          m[2] -> \nblah blah blah blah blah blah

          subs["customer-reviewed answer"] = "blah blah blah blah blah blah"
      */
      const subs: Record<string, string> = {};
      for (const m of block.matchAll(/^### (.+)\n([\s\S]*?)(?=\n### |$)/gm)) {
        subs[m[1].trim().toLowerCase()] = m[2].trim();
      }

      /*
      “I just opened VERIFI. What should I do first?”, “Can I start from a backup or sample data?”

        it1:
          m[0] -> ""I just opened VERIFI. What should I do first?""
          m[1] -> "I just opened VERIFI. What should I do first?"

          intents.push("I just opened VERIFI. What should I do first?")
        it2:
          m[1] -> "Can I start from a backup or sample data?"

          intents.push("Can I start from a backup or sample data?")

        intents = ["I just opened VERIFI. What should I do first?", "Can I start from a backup or sample data?"]

      */
      const intents: string[] = [];
      for (const m of (recView['user intents'] ?? '').matchAll(/[“"]([^”"]+)[”"]/g)) {
        intents.push(m[1].trim());
      }

      //split the values from recView['keywords]' so that they're separated by commas and make sure to only capture nonempty string (doesnt account for empty items or trailing commas)
      /*
        [
          "welcome",
          "first time",
          "create account",
          "backup",
          "sample data",
          "contact"
        ]
      */
      const keywords = (recView['keywords'] ?? '').split(',').map(s => s.trim()).filter(s => s.length > 0);

      /*
      [VERIFI User Guide, PDF pages 14–15](../reference/VERIFI-user-guide.pdf#page=14)

        m[0] -> "](../reference/VERIFI-user-guide.pdf#page=14)"
        m[1] -> "../reference/VERIFI-user-guide.pdf#page=14"

        sources.push("../reference/VERIFI-user-guide.pdf#page=14")

      */
      const sources: string[] = [];
      for (const m of (subs['sources'] ?? '').matchAll(/\]\(([^)]+)\)/g)) {
        sources.push(m[1]);
      }

      //after parsing, build the record 
      const record: KbRecord = {
        id,
        title,
        category,
        status: recView['status'] ?? '',
        appliesTo: recView['applies to'] ?? '',
        intents,
        keywords,
        safety: recView['safety'] ?? 'Normal',
        answer: subs['customer-reviewed answer'] ?? '',
        limitations: subs['limitations'],
        warning: subs['required warning'],
        sources,
      };

      //only store the record if its been reviewed... which i think SHOULD actually be all of them? 
      //...but im keeping this here just in case another rule is added in the future and it hasnt been reviewed yet 
      if (record.status.toLowerCase() === 'reviewed') {
        records.push(record);
      }
    }

    return records;
  }

}


