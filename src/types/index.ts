export interface Category {
  id: string
  name: string
  icon: string | null
  sort_order: number
}

export interface Item {
  id: string
  category_id: string
  name: string
  slot_limit: number | null
  note: string | null
  sort_order: number
}

export interface Assignment {
  id: string
  item_id: string
  user_name: string
  custom_note: string | null
  created_at: string
}

export interface CategoryWithItems extends Category {
  items: Item[]
}

export interface ItemWithAssignments extends Item {
  assignments: Assignment[]
}

export interface FormData {
  user_name: string
  selections: {
    item_id: string
    custom_note?: string
  }[]
}
