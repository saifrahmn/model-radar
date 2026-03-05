// =============================================
// GitHub Service
// Free — just needs GITHUB_TOKEN env var
// Get token at: github.com/settings/tokens
// =============================================

export async function fetchGitHubTrendingAI() {
  const token = process.env.GITHUB_TOKEN;

  const res = await fetch(
    'https://api.github.com/search/repositories?q=LLM+language-model+stars:>1000&sort=stars&order=desc&per_page=20',
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(token ? { Authorization: `token ${token}` } : {}),
      },
      next: { revalidate: 7200 }, // 2 hours
    }
  );

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  const data = await res.json();
  return data.items ?? [];
}
