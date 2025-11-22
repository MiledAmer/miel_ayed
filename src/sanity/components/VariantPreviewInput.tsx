import type { StringInputProps } from 'sanity'
import { useFormValue, set, unset } from 'sanity'
import { Stack, Select, Text } from '@sanity/ui'
import type { ChangeEvent } from 'react'

export function VariantPreviewInput(props: StringInputProps) {
  const variants = useFormValue(['variants']) as Array<{
    weight?: string
    price?: number
    _key?: string
  }> | undefined

  if (!variants || variants.length === 0) {
    return (
      <Stack space={3}>
        <Text  muted>
          Add variants first to select a preview variant
        </Text>
      </Stack>
    )
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value
    props.onChange(value ? set(value) : unset())
  }

  return (
    <Stack space={3}>
      <Select   
        value={props.value ?? ''}
        onChange={handleChange}
      >
        <option value="">Select a variant</option>
        {variants.map((variant) => (
          <option key={variant._key} value={variant._key}>
            {variant.weight ?? 'N/A'} - {variant.price ?? 0} DT
          </option>
        ))}
      </Select>
    </Stack>
  )
}
