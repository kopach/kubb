import { createRoot } from '@kubb/react'
import { OperationGenerator as Generator } from '@kubb/swagger'
import { Oas } from '@kubb/swagger/components'

import { Mock } from './components/Mock.tsx'
import { Operations } from './components/Operations.tsx'

import type { AppContextProps } from '@kubb/react'
import type { OperationMethodResult, OperationsByMethod } from '@kubb/swagger'
import type { Operation } from '@kubb/swagger/oas'
import type { FileMeta, PluginOptions } from './types.ts'

export class OperationGenerator extends Generator<PluginOptions['resolvedOptions'], PluginOptions> {
  async all(operations: Operation[], operationsByMethod: OperationsByMethod): OperationMethodResult<FileMeta> {
    const { oas, pluginManager, plugin } = this.context

    const root = createRoot<AppContextProps<PluginOptions['appMeta']>>({ logger: pluginManager.logger })

    const templates = {
      operations: Operations.templates,
      mock: Mock.templates,
      ...this.options.templates,
    }

    root.render(
      <Oas oas={oas} operations={operations} getSchemas={(...props) => this.getSchemas(...props)}>
        {templates?.operations && <Operations.File templates={templates.operations} />}
      </Oas>,
      { meta: { pluginManager, plugin } },
    )

    return root.files
  }

  async #generate(operation: Operation, options: PluginOptions['resolvedOptions']): OperationMethodResult<FileMeta> {
    const { oas, pluginManager, plugin } = this.context

    const root = createRoot<AppContextProps<PluginOptions['appMeta']>>({ logger: pluginManager.logger })

    const templates = {
      handlers: Operations.templates,
      mock: Mock.templates,
      ...options.templates,
    }

    if (!templates?.mock) {
      return []
    }

    root.render(
      <Oas oas={oas} operations={[operation]} getSchemas={(...props) => this.getSchemas(...props)}>
        <Oas.Operation operation={operation}>
          <Mock.File templates={templates.mock} />
        </Oas.Operation>
      </Oas>,
      { meta: { pluginManager, plugin: { ...plugin, options } } },
    )

    return root.files
  }

  async get(operation: Operation, options: PluginOptions['resolvedOptions']): OperationMethodResult<FileMeta> {
    return this.#generate(operation, options)
  }

  async post(operation: Operation, options: PluginOptions['resolvedOptions']): OperationMethodResult<FileMeta> {
    return this.#generate(operation, options)
  }

  async put(operation: Operation, options: PluginOptions['resolvedOptions']): OperationMethodResult<FileMeta> {
    return this.#generate(operation, options)
  }
  async patch(operation: Operation, options: PluginOptions['resolvedOptions']): OperationMethodResult<FileMeta> {
    return this.#generate(operation, options)
  }
  async delete(operation: Operation, options: PluginOptions['resolvedOptions']): OperationMethodResult<FileMeta> {
    return this.#generate(operation, options)
  }
}
