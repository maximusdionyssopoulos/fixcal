import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Temporary fix for InertiaFormProps not being exported from @inertiajs/react
type InertiaFormProps<TForm extends Record<string, any>> = ReturnType<
  typeof useForm<TForm>
>;

interface FormProps {
  url: string;
  name: string;
  onSubmit: (form: InertiaFormProps<{ url: string; name: string }>) => void;
  submitText: string;
}

export default function Form({ url, name, onSubmit, submitText }: FormProps) {
  const form = useForm({
    url: url,
    name: name,
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-muted-foreground text-sm">
          Name
        </label>
        <Input
          type="text"
          name="name"
          id="name"
          value={data.name}
          placeholder="Calendar Name"
          className="bg-background h-12"
          onChange={(e) => setData("name", e.target.value)}
        />
        {errors.url && (
          <div className="text-sm text-destructive-foreground">
            {errors.url}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="url" className="text-muted-foreground text-sm">
          Url
        </label>
        <Input
          type="text"
          name="url"
          id="url"
          value={data.url}
          placeholder="https://sportfix.net/app/teamdetails?"
          className="bg-background h-12"
          onChange={(e) => setData("url", e.target.value)}
        />
        {errors.url && (
          <div className="text-sm text-destructive-foreground">
            {errors.url}
          </div>
        )}
      </div>
      <Button
        type="submit"
        disabled={processing}
        size={"lg"}
        className="w-full"
      >
        {submitText}
      </Button>
    </form>
  );
}
