<template>
    <div class="w-full max-h-[100vh] p-2 overflow-auto">
            <h1>Tatu Shaxmat</h1>
            <div id="tournament">
            <ul class="round round-1">
                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top winner">Lousville <span>79</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom ">NC A&T <span>48</span></li>

                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top winner">Colo St <span>84</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom ">Missouri <span>72</span></li>

                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top ">Oklahoma St <span>55</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom winner">Oregon <span>68</span></li>

                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top winner">Saint Louis <span>64</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom ">New Mexico St <span>44</span></li>

                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top winner">Memphis <span>54</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom ">St Mary's <span>52</span></li>

                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top winner">Mich St <span>65</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom ">Valparaiso <span>54</span></li>

                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top winner">Creighton <span>67</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom ">Cincinnati <span>63</span></li>

                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top winner">Duke <span>73</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom ">Albany <span>61</span></li>

                <li class="spacer">&nbsp;</li>
            </ul>
            <ul class="round round-2">
                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top winner">Lousville <span>82</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom ">Colo St <span>56</span></li>

                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top winner">Oregon <span>74</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom ">Saint Louis <span>57</span></li>

                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top ">Memphis <span>48</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom winner">Mich St <span>70</span></li>

                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top ">Creighton <span>50</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom winner">Duke <span>66</span></li>

                <li class="spacer">&nbsp;</li>
            </ul>
            <ul class="round round-3">
                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top winner">Lousville <span>77</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom ">Oregon <span>69</span></li>

                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top ">Mich St <span>61</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom winner">Duke <span>71</span></li>

                <li class="spacer">&nbsp;</li>
            </ul>
            <ul class="round round-4">
                <li class="spacer">&nbsp;</li>
                
                <li class="game game-top winner">Lousville <span>85</span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom ">Duke <span>63</span></li>
                
                <li class="spacer">&nbsp;</li>
            </ul>   
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style>
#tournament{
  display:flex;
  flex-direction:row;
}
.round{
  display:flex;
  flex-direction:column;
  justify-content:center;
  width:200px;
  list-style:none;
  padding:0;
}
  .round .spacer{ flex-grow:1; }
  .round .spacer:first-child,
  .round .spacer:last-child{ flex-grow:.5; }

  .round .game-spacer{
    flex-grow:1;
  }

/*
 *  General Styles
*/

li.game{
  padding-left:20px;
}

  li.game.winner{
    font-weight:bold;
  }
  li.game span{
    float:right;
    margin-right:5px;
  }

  li.game-top{ border-bottom:1px solid #aaa; }

  li.game-spacer{ 
    border-right:1px solid #aaa;
    min-height:40px;
  }

  li.game-bottom{ 
    border-top:1px solid #aaa;
  }
</style>