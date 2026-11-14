'use client';

import { useRef, useState } from 'react';
import { Download, ShieldCheck, Trash2, Upload } from 'lucide-react';
import { Button, Callout } from '@/components/ui/primitives';
import {
  clearAllPersonalData, downloadText, exportBackup, getRecords, importBackup,
} from '@/lib/storage';
import type { HealthRecord } from '@/lib/types';

export function DataManager({ onChanged }: { onChanged: (records: HealthRecord[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  const handleExport = () => {
    const date = new Date().toISOString().slice(0, 10);
    downloadText(`longevia-backup-${date}.json`, exportBackup());
    setMessage({ kind: 'ok', text: '备份文件已下载。文件包含你自己记录的数据，请妥善保管。' });
  };

  const handleImport = async (file?: File) => {
    if (!file) return;
    const text = await file.text();
    const result = importBackup(text);
    setMessage(result.ok
      ? { kind: 'ok', text: `已导入 ${result.count} 条记录，同日期记录以导入文件为准。` }
      : { kind: 'error', text: result.error ?? '导入失败' });
    if (result.ok) onChanged(getRecords());
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDelete = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    clearAllPersonalData();
    onChanged([]);
    setConfirming(false);
    setMessage({ kind: 'ok', text: '已删除本浏览器中 LONGEVIA 保存的全部本地数据。' });
  };

  return (
    <section className="surface rounded-xl p-5 sm:p-7" aria-labelledby="data-manager-heading">
      <span className="eyebrow">数据隐私 / Privacy</span>
      <h2 id="data-manager-heading" className="editorial-title mt-3 text-[1.4rem] sm:text-[1.7rem]">导出、备份与删除</h2>
      <p className="mt-3 text-[0.84rem] leading-7 text-muted">
        所有记录默认保存在当前浏览器的本地存储中，不会自动上传。导出文件带数据来源标记、结构版本与说明；删除操作不可撤销，请先导出备份。
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-cream-light p-4">
          <p className="flex items-center gap-2 text-[0.86rem] font-semibold text-forest"><Download className="h-4 w-4" />数据导出</p>
          <p className="mt-2 text-[0.74rem] leading-6 text-muted">导出 JSON 备份，包含健康记录、打卡、活动、睡眠、训练与收藏。</p>
          <Button type="button" size="sm" variant="outline" className="mt-4" onClick={handleExport}>导出备份</Button>
        </div>
        <div className="rounded-lg border border-line bg-cream-light p-4">
          <p className="flex items-center gap-2 text-[0.86rem] font-semibold text-forest"><Upload className="h-4 w-4" />数据备份 / 导入</p>
          <p className="mt-2 text-[0.74rem] leading-6 text-muted">导入此前导出的 JSON 文件，记录会先通过结构校验再写入。</p>
          <input ref={inputRef} type="file" accept="application/json,.json" onChange={(e) => handleImport(e.target.files?.[0])} className="mt-3 block w-full text-[0.72rem] text-muted file:mr-2 file:rounded-full file:border-0 file:bg-forest file:px-3 file:py-1.5 file:text-[0.72rem] file:text-cream" />
        </div>
        <div className="rounded-lg border border-line bg-cream-light p-4">
          <p className="flex items-center gap-2 text-[0.86rem] font-semibold text-forest"><Trash2 className="h-4 w-4" />数据删除</p>
          <p className="mt-2 text-[0.74rem] leading-6 text-muted">一键清除本站在此浏览器保存的所有个人数据，需二次确认。</p>
          <Button type="button" size="sm" variant={confirming ? 'primary' : 'outline'} className="mt-4" onClick={handleDelete}>
            {confirming ? '确认删除全部数据' : '删除全部数据'}
          </Button>
          {confirming && <button type="button" onClick={() => setConfirming(false)} className="ml-2 text-[0.72rem] text-muted underline">取消</button>}
        </div>
      </div>

      {message && (
        <p className={`mt-4 rounded-lg px-3.5 py-2.5 text-[0.78rem] ${message.kind === 'ok' ? 'bg-forest-50 text-forest' : 'bg-gold-light/30 text-ink'}`}>{message.text}</p>
      )}

      <Callout kind="note" title="关于数据同步" className="mt-5">
        <p>本站预留了后端 API、用户系统与数据同步扩展能力，但当前版本不上传任何个人健康数据。未来若启用同步，会在明确授权后才会进行，并公开数据用途与删除方式。</p>
      </Callout>
      <p className="mt-4 flex items-start gap-2 text-[0.74rem] leading-6 text-muted">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-600" />
        数据来源标记：每条记录可注明「自测 / 体检报告 / 医疗机构 / 其他」及测量单位与条件；备份文件也包含来源说明。
      </p>
    </section>
  );
}
