import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Globe, Lock } from "lucide-react";

// Temporary fix for InertiaFormProps not being exported from @inertiajs/react
type InertiaFormProps<TForm extends Record<string, any>> = ReturnType<
  typeof useForm<TForm>
>;

interface FormProps {
  url: string;
  name: string;
  publiclyAccessible: boolean;
  onSubmit: (
    form: InertiaFormProps<{
      url: string;
      name: string;
      public: boolean;
    }>,
  ) => void;
  submitText: string;
}

export default function Form({
  url,
  name,
  publiclyAccessible,
  onSubmit,
  submitText,
}: FormProps) {
  const form = useForm({
    url: url,
    name: name,
    public: publiclyAccessible,
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

      <RadioGroup
        value={data.public ? "public" : "private"}
        onValueChange={(value) =>
          setData("public", value === "public" ? true : false)
        }
        className="space-y-2 flex items-top space-x-2 w-full"
      >
        <div className="w-full">
          <RadioGroupItem value="public" id="public" className="peer sr-only" />
          <Label
            htmlFor="public"
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-muted cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted/50 transition-colors"
          >
            <Globe />
            <div className="flex flex-col">
              <span className="font-medium">Public</span>
              <span className="text-xs">Visible to everyone</span>
            </div>
          </Label>
        </div>
        <div className="w-full">
          <RadioGroupItem
            value="private"
            id="private"
            className="peer sr-only"
          />
          <Label
            htmlFor="private"
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-muted cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted/50 transition-colors"
          >
            <Lock />
            <div className="flex flex-col">
              <span className="font-medium">Private</span>
              <span className="text-xs">Only visible to you</span>
            </div>
          </Label>
        </div>
        {errors.public && (
          <div className="text-sm text-destructive-foreground">
            {errors.public}
          </div>
        )}
      </RadioGroup>

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
