import { LucideProps } from "lucide-react"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export interface catogaryList {
  name: string
}

export interface featureServiceProps {
  title: string
  desc: string
  image: string
}
