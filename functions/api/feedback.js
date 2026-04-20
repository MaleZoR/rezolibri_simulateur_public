export async function onRequest(context) {
  const { request, env } = context;

  const GITHUB_TOKEN = env.GITHUB_TOKEN;
  const REPO_OWNER = "MaleZoR";
  const REPO_NAME = "rezolibri_simulateur_public";

  if (!GITHUB_TOKEN) {
    return new Response(JSON.stringify({ error: "Configuration GITHUB_TOKEN manquante sur le serveur." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = new URL(request.url);

  // --- GET : Récupérer les feedbacks existants ---
  if (request.method === "GET") {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?labels=feedback&state=all&per_page=20`,
        {
          headers: {
            "Authorization": `Bearer ${GITHUB_TOKEN}`,
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "Cloudflare-Pages-Function",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const issues = await response.json();
      const formattedIssues = issues.map((issue) => ({
        id: issue.id,
        number: issue.number,
        title: issue.title,
        body: issue.body,
        state: issue.state,
        user: issue.user.login,
        created_at: issue.created_at,
        html_url: issue.html_url,
      }));

      return new Response(JSON.stringify(formattedIssues), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // --- POST : Créer un nouveau feedback ---
  if (request.method === "POST") {
    try {
      const { title, body, metadata } = await request.json();

      // Construction du corps détaillé du ticket
      const issueBody = `
## Description
${body}

---
### 🛠 Infos Techniques
- **Navigateur** : ${metadata.userAgent}
- **URL** : ${metadata.url}
- **Étape** : ${metadata.currentStep || 'N/A'}
- **Résolution** : ${metadata.screenResolution}
- **Date** : ${new Date().toLocaleString('fr-FR')}
      `;

      const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GITHUB_TOKEN}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json",
          "User-Agent": "Cloudflare-Pages-Function",
        },
        body: JSON.stringify({
          title,
          body: issueBody,
          labels: ["feedback", "preprod"],
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Erreur lors de la création de l'issue");
      }

      const result = await response.json();
      return new Response(JSON.stringify({ success: true, issue: result.html_url }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response("Method not allowed", { status: 405 });
}
