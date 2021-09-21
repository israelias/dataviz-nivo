export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export const NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: 'Templates',
  //   // @ts-ignore
  //   children: data.map((category) => ({
  //     label: category.name,
  //     subLabel: category.subLabel,
  //     href: `/${category.id}/${category.children?.[0].id}`,
  //   })),
  // },
  {
    label: 'Contribute',
    href: '',
  },
  {
    label: 'GitHub',
    href: '',
  },
  {
    label: 'Discord',
    href: '',
  },
];
