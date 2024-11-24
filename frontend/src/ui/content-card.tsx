import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
export function ContentCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>This is a description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This is the content</p>
            </CardContent>
        </Card>
    )
}