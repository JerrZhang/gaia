import { z } from 'zod';
import { ConfigItemBase, ProviderContext } from './common';
import { NonPrimitiveTypes } from '../types';

export type LogicalOperand =
    | { kind: 'input' }
    | {
          kind: 'select';
          multiple?: boolean;
          items: {
              label: string;
              value: any;
              group?: string;
          }[];
      }
    | { kind: 'none' };

export type LogicalOperandValue =
    | string
    | {
          label: string;
          value: any;
          group?: string;
      };

export type LogicalOperator = { key: string; name: string };

/**
 * 逻辑判断组配置项
 */
export interface LogicalGroupItem extends ConfigItemBase {
    type: 'logical-group';

    /**
     * 提供左运算数
     */
    leftProvider: (
        context: ProviderContext
    ) => LogicalOperand | Promise<LogicalOperand>;

    /**
     * 提供对比操作符
     */
    operatorProvider: (
        leftOperandValue: LogicalOperandValue
    ) => LogicalOperator[];

    /**
     * 提供右运算数
     */
    rightProvider: (
        context: ProviderContext,
        leftOperandValue: LogicalOperandValue,
        operator: LogicalOperator
    ) => LogicalOperand | Promise<LogicalOperand>;
}

export const LogicalItemSchema = z.object({
    left: z.unknown(),
    right: z.unknown(),
    operator: z.string(),
});

export type LogicalGroupType = {
    groupOperator: 'and' | 'or';
    items: Array<LogicalGroupType | z.infer<typeof LogicalItemSchema>>;
};

export const getSchema = (): z.ZodType<LogicalGroupType> =>
    z.object({
        $type: z.literal(NonPrimitiveTypes.logicalGroup),
        groupOperator: z.union([z.literal('and'), z.literal('or')]),
        items: z.array(z.union([z.lazy(getSchema), LogicalItemSchema])),
    });

export type LogicalGroup = z.infer<ReturnType<typeof getSchema>>;
