import { format } from "date-fns";

export default function() {
  return format(new Date(), "dd-MM-yyyy");
}
