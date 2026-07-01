import { useState } from "react";
import { Input } from "@/components/ui/Input";

export interface ShippingData {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

interface ShippingFormProps {
  value: ShippingData;
  onChange: (next: ShippingData) => void;
}

export function ShippingForm({ value, onChange }: ShippingFormProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const set = (k: keyof ShippingData, v: string) => onChange({ ...value, [k]: v });
  const err = (k: keyof ShippingData) => (touched[k] && !value[k] ? "Required" : undefined);

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Full name"
          name="name"
          value={value.name}
          onChange={(e) => set("name", e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          error={err("name")}
          placeholder="Aiko Tanaka"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={value.email}
          onChange={(e) => set("email", e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          error={err("email")}
          placeholder="otaku@example.com"
        />
      </div>
      <Input
        label="Address"
        name="address"
        value={value.address}
        onChange={(e) => set("address", e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, address: true }))}
        error={err("address")}
        placeholder="4-2-1 Shibuya"
      />
      <div className="grid sm:grid-cols-3 gap-4">
        <Input
          label="City"
          name="city"
          value={value.city}
          onChange={(e) => set("city", e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, city: true }))}
          error={err("city")}
        />
        <Input
          label="ZIP / Postal"
          name="zip"
          value={value.zip}
          onChange={(e) => set("zip", e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, zip: true }))}
          error={err("zip")}
        />
        <Input
          label="Country"
          name="country"
          value={value.country}
          onChange={(e) => set("country", e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, country: true }))}
          error={err("country")}
          defaultValue="Japan"
        />
      </div>
    </div>
  );
}
