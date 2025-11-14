import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function InputWithButton() {
  return (
    <form className="flex w-full max-w-sm items-center gap-2">
      <Input type="text" placeholder="Add todo" />
      <Button type="submit" variant="outline">
        Submit
      </Button>
    </form>
  )
}
export default InputWithButton