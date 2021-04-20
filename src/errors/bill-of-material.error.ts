
export class BillOfMaterialParsingError extends Error {
  constructor(bomYaml: string) {
    super('Error parsing BOM yaml: \n' + bomYaml);
  }
}

export class BillOfMaterialModuleParsingError extends Error {
  constructor(moduleConfigYaml: string) {
    super('Error parsing BOM module config yaml: \n' + moduleConfigYaml);
  }
}

export class BillOfMaterialVariableParsingError extends Error {
  constructor(bomVariableYaml: string) {
    super('Error parsing BOM variable yaml: \n' + bomVariableYaml);
  }
}

export class BillOfMaterialModuleConfigError extends Error {
  readonly unmatchedVariableNames: string[];
  readonly unmatchedDependencyNames: string[];
  readonly availableVariableNames: string[];
  readonly availableDependencyNames: string[];

  constructor({unmatchedVariableNames, unmatchedDependencyNames, availableVariableNames, availableDependencyNames}: {unmatchedVariableNames: string[], unmatchedDependencyNames: string[], availableVariableNames: string[], availableDependencyNames: string[]}) {
    super('Variables and/or dependencies provided in config but not defined in module.');

    this.availableDependencyNames = availableDependencyNames;
    this.availableVariableNames = availableVariableNames;
    this.unmatchedDependencyNames = unmatchedDependencyNames;
    this.unmatchedVariableNames = unmatchedVariableNames;
  }
}
