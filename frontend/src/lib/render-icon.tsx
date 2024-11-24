import { CircleAlert, Link } from "lucide-react"

export function renderIcon(contentType: any) {
    switch (contentType) {
        case "link":
            return <Link />
        default:
            return <CircleAlert/>
    }
}