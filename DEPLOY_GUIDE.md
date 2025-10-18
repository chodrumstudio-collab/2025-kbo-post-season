# 🚀 2025 KBO 포스트시즌 대시보드 배포 가이드

## 📋 준비된 것들:
- ✅ Git 리포지토리 초기화
- ✅ 85개 파일, 14,642줄 코드 커밋 완료
- ✅ Vercel 배포 설정 완료
- ✅ 프로덕션 빌드 설정

## 🔗 GitHub 푸시 방법:

### 1. GitHub Personal Access Token 생성:
```bash
# GitHub.com → Settings → Developer settings → Personal access tokens → Generate new token
# Scopes: repo (전체 repo 권한 체크)
```

### 2. 인증 후 푸시:
```bash
git push -u origin main
# Username: your_github_username  
# Password: ghp_xxxxxxxxxxxx (Personal Access Token)
```

### 또는 SSH 키 사용:
```bash
git remote set-url origin git@github.com:chodrumstudio-collab/2025-kbo-post-season.git
git push -u origin main
```

## 🌐 Vercel 배포:

### 방법 1: Vercel CLI (추천)
```bash
# Vercel 설치
npm i -g vercel

# 로그인 
vercel login

# 배포
vercel --prod
```

### 방법 2: Vercel 웹사이트
1. https://vercel.com 접속
2. GitHub 연결
3. "Import Project" → GitHub 리포지토리 선택
4. 자동 배포 완료!

## ⚡ 빠른 배포 명령어:
```bash
yarn deploy  # build + vercel --prod
```

## 🎯 배포 후 확인 사항:
- [ ] 브라우저 타이틀: "2025 KBO 포스트시즌"
- [ ] KBO 공식사이트 링크 작동
- [ ] 네이버 스포츠 링크 작동  
- [ ] YouTube 하이라이트 링크 작동
- [ ] 모바일 반응형 확인

## 📱 예상 배포 URL:
```
https://2025-kbo-postseason.vercel.app
또는
https://2025-kbo-post-season.vercel.app
```

---

🏆 **실제 KBO 포스트시즌 데이터로 연결되는 완성된 대시보드입니다!**
