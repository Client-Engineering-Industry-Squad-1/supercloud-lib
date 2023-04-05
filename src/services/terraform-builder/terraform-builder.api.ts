import {
  BillOfMaterialModel,
  CatalogV2Model,
  SingleModuleVersion, TerraformComponentModel,
  InputVariable
} from '../../models';

export abstract class TerraformBuilderApi {
  abstract buildTerraformComponent(modules: SingleModuleVersion[], catalogModel: CatalogV2Model, inputVariables?: InputVariable[], billOfMaterial?: BillOfMaterialModel): Promise<TerraformComponentModel>;
}
