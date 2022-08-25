<template>
    <div>

        <h1>Страница с постами</h1>
        <MyInput    
            v-model="searchQuery"
            placeholder="Поиск..."
        />
            
        

        <div class="app__btns">
            <MyButton 
            @click="showDialog"
            >
            Создать пост
            </MyButton>

            <MySelect
                v-model="selectedSort"
                :options="sortOptions"
            
            >
                
            </MySelect>
        
        </div>

        <MyDialog v-model:show="dialogVisible">
             <PostForm @create="createPost"></PostForm>
        </MyDialog>
       
        <PostList 
            :posts="searchSortedPosts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />

        <div v-else>Идет загрузка...</div>
        <div v-intersection="loadMorePosts"></div>
            
        <!-- <div class="page__wrapper">
            <div
                v-for="page_num in totalPages"
                :key="page_num"
                class="page"
                :class="{
                    'current-page': page_num === page
                }"
                @click="changePage(page_num)"
            >
            {{page_num}}
            </div>
        </div> -->

       
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import MyButton from '@/components/UI/MyButton.vue';
import axios from 'axios';
import MySelect from '@/components/UI/MySelect.vue';

export default {
    components: {
    PostForm,
    PostList,
    MyDialog,
    MyButton,
    MySelect,
},

    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1, 
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'By title'},
                {value: 'body', name: 'By body'}
            ]
        }
    },
    methods: {
        createPost(post){
           this.posts.push(post);
           this.dialogVisible = false;
        },
        removePost(post){
            this.posts = this.posts.filter(p => p.id !== post.id)

        },
        showDialog(){
            this.dialogVisible = true;
        },
        // changePage(page_num){
        //     this.page = page_num
        // },

        async fetchPosts(){
            try {
                this.isPostsLoading = true
                
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?',{
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPages  = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data;  
            } 
            catch (error){
                alert('Error')
            } finally{
               this.isPostsLoading = false;
            }
        },    
         async loadMorePosts(){
            try {
                this.page += 1
               
                
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?',{
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPages  = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts, ...response.data];  
            } 
            catch (error){
                alert('Error')
            }
        },    
    },
    mounted() {
            this.fetchPosts();
            // console.log(this.$refs.observer);
            // const options = {
            //     rootMargin: '0px',
            //     threshold: 1.0
            // }
            // const callback = (entries, observer) => {
            //     if(entries[0].isIntersecting && this.page < this.totalPages) {
            //         this.loadMorePosts()
            //     }
            // };
            // const observer = new IntersectionObserver(callback, options);
            // observer.observe(this.$refs.observer)
    },
    computed: {
        sortedPosts(){
           return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        searchSortedPosts(){
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },

    watch: {
        // page(){
        //     this.fetchPosts()
        // }
    },
}
</script>

<style>

.app__btns{
    margin:15px 0px;
    display: flex;
    justify-content: space-between;

}





/* .page__wrapper{
    display: flex;
    margin-top: 15px;
}
.page{
    border: 1px solid black;
    padding: 15px;
}

.current-page {
    border: 2px solid teal;
} */


</style>