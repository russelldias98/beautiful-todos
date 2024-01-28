import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function UserNav() {
  return (
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Avatar className="h-9 w-9">
        <AvatarImage src="http://placekitten.com/200/200" />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
    </Button>
  );
}
