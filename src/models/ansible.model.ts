import {join} from 'path'

import { OutputFileType } from '../models';
import { SolutionModel} from '../models/solution.model';
import {
  AnsiblePlaybookTemplateModel,
  TemplatedFile,
} from '../template-models/models';

export class AnsiblePlaybookFile extends TemplatedFile {

  constructor(private bom: SolutionModel, name: string = 'playbook.yml') {
    super(name, OutputFileType.ansible, join(__dirname, './templates/playbook.liquid'))
  }

  get model(): Promise<AnsiblePlaybookTemplateModel> {
    return Promise.resolve({
      solutionName: this.bom.metadata?.name || 'Solution',
      stack: this.bom.spec.stack
    })
  }
}