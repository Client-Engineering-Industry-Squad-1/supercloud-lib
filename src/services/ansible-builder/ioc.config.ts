import {AnsibleBuilderApi} from './ansible-builder.api';
import {AnsibleBuilderNew} from './ansible-builder.new';

export default [
  {bind: AnsibleBuilderApi, to: AnsibleBuilderNew}
]
