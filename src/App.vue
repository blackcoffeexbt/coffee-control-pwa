<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useSettingsStore } from './stores/settings'
import { SimplePool, getPublicKey } from 'nostr-tools'

const store = useSettingsStore()
let pool = null
let sub = null

onMounted(() => {
  // Start listening for "okay" messages
  if (store.relayUrl && store.nsec && store.microcontrollerNpub) {
    try {
      console.log(store.relayUrl)
      pool = new SimplePool()


      pool.subscribe(
        [store.relayUrl],
        {
          kinds: [4],
          authors: [store.microcontrollerNpub, getPublicKey(store.nsec)],
          // '#p': [getPublicKey(store.nsec)],
          limit: 1
        },
        {
          onevent(event) {
            console.log('got event:', event)
          }
        }
      )


    } catch (error) {
      console.error('Failed to setup Nostr subscription:', error)
    }
  }
})

onUnmounted(() => {
  if (sub) {
    sub.unsub()
  }
  if (pool) {
    pool.close()
  }
})
</script>

<template>
  <div class="app">
    <nav>
      <router-link to="/">Coffee Machine</router-link>
      <router-link to="/settings">Settings</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  background-color: #f5f5f5;
}

nav {
  background-color: #333;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

nav a:hover {
  background-color: #444;
}

nav a.router-link-active {
  background-color: #4CAF50;
}
</style>
