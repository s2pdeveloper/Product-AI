import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  {
    name: '',
    title: true,
  },
  {
    name: 'Users',
    url: '/users/users',
    icon: 'icon-user',
  },

  {
    name: 'Category',
    url: '/category/category-list',
    icon: 'icon-user',
  },

  {
    name: 'Product',
    url: '/product/product-list',
    icon: 'icon-user',
  },

  // {
  //   name: 'Slider',
  //   url: '/images/image/1',
  //   icon: 'cil-image-plus',
  // },
  // {
  //   name: 'StudentAchievement',
  //   url: '/studentAchievement/studentAchievement',
  //   icon: 'cil-spreadsheet',
  // },
  // {
  //   name: 'Notification',
  //   url: '/notification/notification-list',
  //   icon: 'icon-bell',
  // },
  // {
  //   name: 'Title',
  //   url: '/title',
  //   icon: 'cil-header',
  // },
  // {
  //   name: 'AboutUS',
  //   url: '/aboutUs/aboutUs-form',
  //   icon: 'cil-header',
  // },
  // {
  //   name: 'Home',
  //   url: '/home/home-form',
  //   icon: 'cil-home',
  // },
  
  // {
  //   name: 'Testimonial',
  //   url: '/testimonial',
  //   icon: 'cil-header',
  // },
  
];

