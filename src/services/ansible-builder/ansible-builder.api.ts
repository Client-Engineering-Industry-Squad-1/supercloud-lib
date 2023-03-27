import {
  BillOfMaterialModel,
  CatalogV2Model,
  SingleModuleVersion,
  AnsibleComponentModel
} from '../../models';

export abstract class AnsibleBuilderApi {
  abstract buildAnsibleComponent(modules: SingleModuleVersion[], catalogModel: CatalogV2Model, billOfMaterial?: BillOfMaterialModel): Promise<AnsibleComponentModel>;
}