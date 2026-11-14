import Link from 'next/link';
import { Button } from '@/components/ui/primitives';
import { BrandMark } from '@/components/illustrations/brand';

export default function NotFound() {
  return (
    <div className="container flex min-h-[62vh] flex-col items-center justify-center py-20 text-center">
      <BrandMark size={54} />
      <p className="mt-8 font-display text-6xl text-forest">404</p>
      <h1 className="editorial-title mt-3 text-2xl">这个页面还没有长出来</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-muted">
        你访问的内容不存在或已调整位置。可以从首页重新出发，或使用顶部搜索查找具体主题。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild><Link href="/">返回首页</Link></Button>
        <Button asChild variant="outline"><Link href="/aging-science">浏览衰老科学</Link></Button>
      </div>
    </div>
  );
}
