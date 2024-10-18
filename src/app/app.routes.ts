import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { Inject, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { UserComponent } from './components/user/user.component';
import { BlogComponent } from './components/blog/blog.component';
import { InformationComponent } from './components/information/information.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MessageComponent } from './components/message/message.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { CommentComponent } from './components/comment/comment.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "",
        component: LayoutComponent,
        canActivateChild: [() => inject(AuthService).isAuthenticated()],
        children:[
            {
                path: "",
                component: HomeComponent
            },
            {
                path: "category",
                component: CategoryComponent
            },
            {
                path: "user",
                component: UserComponent
            },
            {
                path: "user-detail/:id",
                component: UserDetailComponent
            },
            {
                path: "blog",
                component: BlogComponent
            },
            {
                path: "blog-detail/:id",
                component: BlogDetailComponent
            },
            {
                path: "information",
                component: InformationComponent
            },
            {
                path: "settings",
                component: SettingsComponent
            },
            {
                path: "message",
                component: MessageComponent
            },
            {
                path: "newsletter",
                component: NewsletterComponent
            },
            {
                path: "comment",
                component: CommentComponent
            }
        ]
    }
];
