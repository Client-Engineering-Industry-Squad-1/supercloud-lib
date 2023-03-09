import {join} from 'path'

import { 
  OutputFileType, 
  BillOfMaterialModel
} from '../models';
import { SolutionModel } from '../models/solution.model';
import {
  AnsibleModulePlaybookTemplateModel,
  AnsibleSolutionPlaybookTemplateModel,
  TemplatedFile,
} from '../template-models/models';

export class AnsibleModulePlaybookFile extends TemplatedFile {

  constructor(private bom: BillOfMaterialModel, name: string = 'playbook.yml') {
    super(name, OutputFileType.ansible, join(__dirname, './templates/playbook.liquid'))
  }

  get model(): Promise<AnsibleModulePlaybookTemplateModel> {
    return Promise.resolve({
      name: this.bom.metadata?.name || 'bill-of-material',
      modules: [{name: this.bom.metadata?.name}] || [{name: 'bill-of-material'}]
    })
  }
}

export class AnsibleSolutionPlaybookFile extends TemplatedFile {

  constructor(private bom: SolutionModel, name: string = 'playbook.yml') {
    super(name, OutputFileType.ansible, join(__dirname, './templates/playbook.liquid'))
  }

  get model(): Promise<AnsibleSolutionPlaybookTemplateModel> {
    return Promise.resolve({
      name: this.bom.metadata?.name || 'Solution',
      modules: this.bom.spec.stack
    })
  }
}