
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function SupportPage() {
  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Support</CardTitle>
                <CardDescription>Get help or provide feedback.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                 <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="e.g. Feedback on reports" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Describe your issue or feedback..."/>
                </div>
                <Button>Submit</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>FAQ</CardTitle>
                <CardDescription>Frequently Asked Questions.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>FAQ section is coming soon.</p>
            </CardContent>
        </Card>
    </div>
  )
}
