import cn from "@/utils/class-names";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export type PageHeaderTypes = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
};

export default function PageHeader({
  title,
  breadcrumb,
  children,
  className,
}: React.PropsWithChildren<PageHeaderTypes>) {
  return (
    <>
      <header
        className={cn(
          "mb-6 flex flex-col @lg:flex-row @lg:items-center @lg:justify-between xs:-mt-2 lg:mb-7",
          className
        )}
      >
        <div>
          <h1 className="mb-2 text-xl font-bold">{title}</h1>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item, index) => (
                <BreadcrumbItem key={item.name}>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.name}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  )}
                  {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {children && <div className="mt-5 @lg:mt-0">{children}</div>}
      </header>
    </>
  );
}
