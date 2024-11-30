import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { LogOut } from "lucide-react"

interface User {
    _id: string
    email: string
    username: string
    createdAt: string
    updatedAt: string
}
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}
const user: User = JSON.parse(localStorage.getItem('user'))
export function Profile() {
    return (
        <div className="flex py-8">
            <Card className="mx-auto max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">User Profile</CardTitle>
                    <CardDescription>
                        User details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p> Username: {user.username}</p>
                    <p> Email: {user.email}</p>
                    <p> Member Since: {new Date(user.createdAt).toLocaleDateString()}</p>

                    <Button variant={'secondary'} className="my-4" onClick={() => logout()}> <LogOut /> Log Out</Button>
                </CardContent>
            </Card>
        </div>
    )
}

