import { QuestionBase } from './question-base';

export class Formgroup extends QuestionBase<string> {
  controlType = 'formgroup';
  type: string;
  desc: string;
  ques: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
