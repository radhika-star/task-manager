import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenubarModule, CommonModule, GalleriaModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  items: MenuItem[] | undefined;
  images: any[] | undefined;
  responsiveOptions: any[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        route: '/home',
      },
      {
        label: 'Login',
        icon: 'pi pi-user',
        route: '/login',
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        route: '/register',
      }
    ];
    this.images = [
      {
        itemImageSrc: 'https://www.shutterstock.com/image-vector/business-planning-task-management-concept-260nw-1987578881.jpg',
        thumbnailImageSrc: 'https://www.shutterstock.com/image-vector/business-planning-task-management-concept-260nw-1987578881.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc: 'https://miro.medium.com/v2/resize:fit:1400/1*u4EBes6Muu2fy7iM8igMug.jpeg',
        thumbnailImageSrc: 'https://miro.medium.com/v2/resize:fit:1400/1*u4EBes6Muu2fy7iM8igMug.jpeg',
        alt: 'Description for Image 2',
        title: 'Title 2',
      },
      {
        itemImageSrc: 'https://www.sweetprocess.com/wp-content/uploads/2022/10/task-management-33.png',
        thumbnailImageSrc: 'https://www.sweetprocess.com/wp-content/uploads/2022/10/task-management-33.png',
        alt: 'Description for Image 3',
        title: 'Title 3',
      },
      {
        itemImageSrc: 'https://projectsly.com/images/task-management-system-screenshot-1.png?v=1691124479409199525',
        thumbnailImageSrc: 'https://projectsly.com/images/task-management-system-screenshot-1.png?v=1691124479409199525',
        alt: 'Description for Image 4',
        title: 'Title 4',
      },
    ];
    this.responsiveOptions = [
      {
        breakpoint: '640px',
        numVisible: 5,
      }
    ];
  }
}
