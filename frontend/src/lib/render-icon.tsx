import { CircleAlert, Link, Twitter } from "lucide-react"

export function renderIcon(contentType: any) {
    switch (contentType) {
        case "link":
            return <Link />
        case "tweet":
            return <Twitter/>
        default:
            return <CircleAlert/>
    }
}