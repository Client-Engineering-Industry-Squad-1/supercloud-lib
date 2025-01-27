import superagent from 'superagent';
import {loadFile} from '../util/file-util/file-util';

export enum OutputFileType {
  terraform = 'terraform',
  tileConfig = 'tile-config',
  documentation = 'documentation',
  dotGraph = 'dot-graph',
  executable = 'executable',
  jinja = 'jinja',
  ansible = 'ansible'
}

export interface OutputFile {
  name: string;
  type?: OutputFileType;
  contents(options?: {flatten?: boolean, path: string}): Promise<string | Buffer>;
}

export class SimpleFile implements OutputFile {
  name: string;
  type?: OutputFileType;
  _contents: string | Buffer

  constructor({name, type, contents}: {name: string, type?: OutputFileType, contents: string | Buffer}) {
    this.name = name
    this.type = type
    this._contents = contents
  }

  contents(): Promise<string | Buffer> {
    return Promise.resolve(this._contents)
  }
}

export class LocalFile implements OutputFile {
  name: string;
  path: string;
  type?: OutputFileType;
  _alternative: () => Promise<string | Buffer>;

  constructor({name, path, type, alternative = () => Promise.resolve('')}: {name: string, path: string, type?: OutputFileType, alternative?: () => Promise<string | Buffer>}) {
    this.name = name;
    this.path = path;
    this.type = type;
    this._alternative = alternative;
  }

  contents(): Promise<string | Buffer> {
    return loadFile(this.path).catch(() => this._alternative())
  }
}

export class UrlFile implements OutputFile {
  name: string;
  url: string;
  type?: OutputFileType;
  _alternative: () => Promise<string | Buffer>;

  constructor({name, url, type, alternative = () => Promise.resolve('')}: {name: string, url: string, type?: OutputFileType, alternative?: () => Promise<string | Buffer>}) {
    this.name = name;
    this.url = url;
    this.type = type;
    this._alternative = alternative;
  }

  contents(): Promise<string | Buffer> {
    return loadFile(this.url).catch(() => this._alternative())
  }
}

export class GitIgnoreFile implements OutputFile {
  name: string = '.gitignore';
  type: OutputFileType = OutputFileType.documentation;

  contents(options?: { flatten?: boolean }): Promise<string | Buffer> {
    return Promise.resolve(`terraform.tfstate
terraform.tfstate.backup
credentials.yaml
credentials.auto.tfvars
.tmp/
.terraform/
`);
  }

}
