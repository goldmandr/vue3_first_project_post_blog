<template>
    <div>
       
        <h1>Страница с постами</h1>
        <MyInput    
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Поиск..."
            v-focus
        />
            
        

        <div class="app__btns">
            <MyButton 
            @click="showDialog"
            >
            Создать пост
            </MyButton>

            <MySelect
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
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
import axios from 'axios';
import MySelect from '@/components/UI/MySelect.vue';
import MyButton from '@/components/UI/MyButton.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

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
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            
            fetchPosts: 'post/fetchPosts',
            loadMorePosts: 'post/loadMorePosts'
        }),
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
        
        
    },
    mounted() {
       this.fetchPosts()
    },
    computed: {
        ...mapState({
        posts: state => state.post.posts,
        isPostsLoading: state => state.post.isPostsLoading,
        selectedSort: state => state.post.selectedSort,
        searchQuery: state => state.post.searchQuery,
        page: state => state.post.page, 
        limit: state => state.post.limit,
        totalPages: state => state.post.totalPages,
        sortOptions: state => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            searchSortedPosts: 'post/searchSortedPosts'
        }),
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