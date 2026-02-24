export const formatedDate = (dateString?: string) => {
    if(!dateString) return "Unknown release date";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options) 
}