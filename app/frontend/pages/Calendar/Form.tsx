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
  onSubmit: (form: InertiaFormProps<{ url: string }>) => void;
  submitText: string;
}

export default function Form({ url, onSubmit, submitText }: FormProps) {
  const form = useForm({
    url: url,
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="url" hidden>
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
