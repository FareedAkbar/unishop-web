import { LucideProps } from "lucide-react"

export interface NavItem {
  title: string
  href?: any
  disabled?: boolean
  external?: boolean
  subMenu?: NavItem[]
}

export interface catogaryList {
  name: string
}

export interface featureServiceProps {
  title: string
  desc: string
  image: string
}
// export interface CategoryProps {
//   category: string
//   subcategories: (CategoryProps | string)[]
//   nestedcategory?: string | CategoryProps
//   subnestedcategories?: (CategoryProps | string)[]
// }

export interface SubcategoryProps {
  nestedcategory: string
  subnestedcategories: string[]
}

export interface CategoryProps {
  category: string
  subcategories: SubcategoryProps[]
}

export interface CategoryList {
  catogaryListArray: CategoryProps[]
}
