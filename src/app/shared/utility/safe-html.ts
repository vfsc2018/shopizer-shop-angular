import { Pipe } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({ name: 'safeHtml' })
export class SafeHtml {

  constructor(private sanitizer: DomSanitizer) { }

  transform(content) {
    console.log(content);
    return this.sanitizer.bypassSecurityTrustHtml(content.replace("<![CDATA[", "").replace("]]>", ""));
    //return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}
