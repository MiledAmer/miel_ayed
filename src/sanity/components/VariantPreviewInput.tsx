import type { ObjectInputProps } from "sanity";
import { useFormValue, set, unset } from "sanity";
import { Stack, Select, Text, Card, Grid } from "@sanity/ui";
import type { ChangeEvent } from "react";

type VariantObject = {
  weight?: string;
  price?: number;
  availability?: boolean;
  _key?: string;
};

export function VariantPreviewInput(props: ObjectInputProps) {
  const variants = useFormValue(["variants"]) as
    | Array<{
        weight?: string;
        price?: number;
        availability?: boolean;
        _key?: string;
      }>
    | undefined;

  if (!variants || variants.length === 0) {
    return (
      <Stack space={3}>
        <Text muted>Add variants first to select a preview variant</Text>
      </Stack>
    );
  }

  const currentValue = props.value as VariantObject | undefined;
  const currentKey = currentValue?._key;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = event.currentTarget.value;
    if (!selectedKey) {
      props.onChange(unset());
      return;
    }

    const selectedVariant = variants.find((v) => v._key === selectedKey);
    if (selectedVariant) {
      props.onChange(
        set({
          weight: selectedVariant.weight,
          price: selectedVariant.price,
          availability: selectedVariant.availability,
          _key: selectedVariant._key,
        }),
      );
    }
  };

  return (
    <Stack space={3}>
      <Select value={currentKey ?? ""} onChange={handleChange}>
        <option value="">Select a variant</option>
        {variants.map((variant) => (
          <option key={variant._key} value={variant._key}>
            {variant.weight ?? "N/A"} - {variant.price ?? 0} DT
          </option>
        ))}
      </Select>

      {currentValue && (
        <Card padding={3} tone="primary" radius={2}>
          <Grid columns={3} gap={4}>
            <div>
              <p className="text-sm text-gray-500">Weight</p>
              <Text>{currentValue.weight}</Text>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <Text>{currentValue.price} DT</Text>
            </div>
            <div>
              <p className="text-sm text-gray-500">Availability</p>
              <Text>
                {currentValue.availability ? "✓ Available" : "✗ Out of Stock"}
              </Text>
            </div>
          </Grid>
        </Card>
      )}
    </Stack>
  );
}
