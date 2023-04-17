import uniq from 'lodash.uniq';
import {Arguments} from 'yargs';

export const DEFAULT_CATALOG_URLS = [
  'https://raw.githubusercontent.com/Client-Engineering-Industry-Squad-1/supercloud-catalog/main/index.yaml',
  'https://raw.githubusercontent.com/Client-Engineering-Industry-Squad-1/supercloud-solutions/main/index.yaml',
  'https://modules.cloudnativetoolkit.dev/index.yaml',
  'https://cloud-native-toolkit.github.io/automation-solutions/index.yaml',
]

export const setupCatalogUrls = (defaultCatalogUrls: string[] = DEFAULT_CATALOG_URLS) => {
  return (argv: Arguments<any>): any | Promise<any> => {
    const result: {catalogUrls?: string[]} = {}

    const catalogUrls: string[] | undefined = argv.catalogUrls

    if (catalogUrls) {
      const newCatalogUrls: string[] = defaultCatalogUrls.concat(catalogUrls)

      result.catalogUrls = uniq(newCatalogUrls)
    }

    return result
  }
}
