import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

import UserIndex from '@/components/users/Index'
import UserCreate from '@/components/users/CreateUser'
import UserEdit from '@/components/users/EditUser'
import UserShow from '@/components/users/ShowUser'
import Login from '@/components/Login' //Authen

//commets
import CommentIndex from '@/components/Comments/Index'
//Blog
import BlogIndex from '@/components/Blogs/Index'
import BlogCreate from '@/components/Blogs/CreateBlog'
import BlogEdit from '@/components/Blogs/EditBlog'
import BlogShow from '@/components/Blogs/ShowBlog'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/Create',
      name: 'User-Create',
      component: UserCreate
    },
    {
      path: '/user/edit/:userId',
      name: 'User-Edit',
      component: UserEdit
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    //Authem
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    //Blogs
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogIndex
    },
    {
      path: '/blog/create',
      name: 'blog-edit',
      component: BlogCreate
    },
    {
      path: '/blog/edit/:blogId',
      name: 'blog-edit',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId',
      name: 'blog',
      component: BlogShow
    },
    //comments
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
  ]
})