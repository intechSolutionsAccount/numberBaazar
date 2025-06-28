export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      vip_numbers: {
        Row: {
          discounted_price: number | null
          id: number
          mobile_number: string
          price: number | null
        }
        Insert: {
          discounted_price?: number | null
          id?: number
          mobile_number: string
          price?: number | null
        }
        Update: {
          discounted_price?: number | null
          id?: number
          mobile_number?: string
          price?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      vip_number_flags: {
        Row: {
          discounted_price: number | null
          id: number | null
          is_108: boolean | null
          is_786: boolean | null
          is_aaabbb: boolean | null
          is_ababab: boolean | null
          is_ababxyxy: boolean | null
          is_abcabc: boolean | null
          is_abcabcabc: boolean | null
          is_counting: boolean | null
          is_doubling: boolean | null
          is_end_abab: boolean | null
          is_hexa: boolean | null
          is_middle_abab: boolean | null
          is_mirror: boolean | null
          is_octa: boolean | null
          is_penta: boolean | null
          is_semi_mirror: boolean | null
          is_septa: boolean | null
          is_start_abab: boolean | null
          is_tetra: boolean | null
          is_three_digit: boolean | null
          is_triple: boolean | null
          is_two_digit: boolean | null
          is_unique: boolean | null
          is_without_248: boolean | null
          mobile_number: string | null
          price: number | null
        }
        Insert: {
          discounted_price?: number | null
          id?: number | null
          is_108?: never
          is_786?: never
          is_aaabbb?: never
          is_ababab?: never
          is_ababxyxy?: never
          is_abcabc?: never
          is_abcabcabc?: never
          is_counting?: never
          is_doubling?: never
          is_end_abab?: never
          is_hexa?: never
          is_middle_abab?: never
          is_mirror?: never
          is_octa?: never
          is_penta?: never
          is_semi_mirror?: never
          is_septa?: never
          is_start_abab?: never
          is_tetra?: never
          is_three_digit?: never
          is_triple?: never
          is_two_digit?: never
          is_unique?: never
          is_without_248?: never
          mobile_number?: string | null
          price?: number | null
        }
        Update: {
          discounted_price?: number | null
          id?: number | null
          is_108?: never
          is_786?: never
          is_aaabbb?: never
          is_ababab?: never
          is_ababxyxy?: never
          is_abcabc?: never
          is_abcabcabc?: never
          is_counting?: never
          is_doubling?: never
          is_end_abab?: never
          is_hexa?: never
          is_middle_abab?: never
          is_mirror?: never
          is_octa?: never
          is_penta?: never
          is_semi_mirror?: never
          is_septa?: never
          is_start_abab?: never
          is_tetra?: never
          is_three_digit?: never
          is_triple?: never
          is_two_digit?: never
          is_unique?: never
          is_without_248?: never
          mobile_number?: string | null
          price?: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_vip_by_pattern: {
        Args: { pattern_flag: string }
        Returns: {
          discounted_price: number | null
          id: number | null
          is_108: boolean | null
          is_786: boolean | null
          is_aaabbb: boolean | null
          is_ababab: boolean | null
          is_ababxyxy: boolean | null
          is_abcabc: boolean | null
          is_abcabcabc: boolean | null
          is_counting: boolean | null
          is_doubling: boolean | null
          is_end_abab: boolean | null
          is_hexa: boolean | null
          is_middle_abab: boolean | null
          is_mirror: boolean | null
          is_octa: boolean | null
          is_penta: boolean | null
          is_semi_mirror: boolean | null
          is_septa: boolean | null
          is_start_abab: boolean | null
          is_tetra: boolean | null
          is_three_digit: boolean | null
          is_triple: boolean | null
          is_two_digit: boolean | null
          is_unique: boolean | null
          is_without_248: boolean | null
          mobile_number: string | null
          price: number | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
