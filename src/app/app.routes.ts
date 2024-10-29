import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout.component';
import { PostCreateComponent } from './admin/pages/admin/post-create/post-create.component';
import { UpdatePostComponent } from './admin/components/update-post/update-post.component';
import { ShowPostComponent } from './admin/components/show-post/show-post.component';
import { PostListComponent } from './admin/pages/admin/post-list/post-list.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthLayoutComponent
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'post',
                children: [
                    {
                        path: 'list',
                        component: PostListComponent
                    },
                    {
                        path: 'create',
                        component: PostCreateComponent
                    },
                    {
                        path: 'edit',
                        component: UpdatePostComponent
                    },
                    {
                        path: 'show',
                        component: ShowPostComponent
                    }
                ]
            }
        ]
    }
];
