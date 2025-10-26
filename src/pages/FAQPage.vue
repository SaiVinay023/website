<template>
  <div class="faq-page">
    <section class="hero">
      <div class="container">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about MyxoFlow.</p>
      </div>
    </section>

    <section class="faq-content">
      <div class="container">
        <div 
          v-for="category in faq.categories" 
          :key="category.title"
          class="faq-category"
        >
          <h2 class="category-title">{{ category.title }}</h2>
          <div 
            v-for="(item, idx) in category.questions" 
            :key="idx"
            class="faq-item"
          >
            <q-expansion-item
              :label="item.question"
              class="expansion"
              dense
              switch-toggle-side
            >
              <div class="answer">{{ item.answer }}</div>
            </q-expansion-item>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import faqData from 'src/data/faq.json'

const faq = ref<{ categories: Array<{ title: string; questions: Array<{ question: string; answer: string }> }> }>({
  categories: []
})

onMounted(() => {
  // Load static JSON
  faq.value = faqData
})
</script>

<style scoped lang="scss">
.faq-page {
  .hero {
    padding: 80px 0;
    background: linear-gradient(135deg, var(--q-primary) 0%, var(--q-secondary) 100%);
    color: white;
    text-align: center;

    h1 {
      font-size: 42px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    p {
      font-size: 18px;
      opacity: 0.9;
    }
  }

  .faq-content {
    padding: 60px 0;

    .faq-category {
      margin-bottom: 40px;

      .category-title {
        font-size: 28px;
        font-weight: 600;
        margin-bottom: 16px;
        color: var(--q-dark);
      }

      .faq-item {
        margin-bottom: 12px;

        .expansion {
          border: 1px solid var(--q-grey-4);
          border-radius: 8px;
          padding: 0;

          .q-expansion-item__container {
            padding: 12px 16px;
          }

          .answer {
            padding: 12px 16px;
            font-size: 16px;
            line-height: 1.6;
            color: var(--q-dark);
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .faq-page {
    .hero h1 {
      font-size: 32px;
    }
    .faq-content .category-title {
      font-size: 24px;
    }
  }
}
</style>
