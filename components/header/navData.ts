export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Send feedback anonymously',
    href: '',
  },
  {
    label: 'Sign Up',
    href: '',
  },
  {
    label: 'Constribute',
    href: '',
  },
];
