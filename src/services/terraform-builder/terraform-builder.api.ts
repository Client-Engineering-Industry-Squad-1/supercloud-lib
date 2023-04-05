import {
  BillOfMaterialModel,
  CatalogV2Model,
  SingleModuleVersion, TerraformComponentModel,
  BillOfMaterialVariable
} from '../../models';

export abstract class TerraformBuilderApi {
  abstract buildTerraformComponent(modules: SingleModuleVersion[], catalogModel: CatalogV2Model, inputVariables?: BillOfMaterialVariable[], billOfMaterial?: BillOfMaterialModel): Promise<TerraformComponentModel>;
}
