
/// <reference lib="ES2022"/>

declare function load(source: string | Packages.java.io.File | Packages.java.net.URL): void;
declare function loadWithNewGlobal(source: string | Packages.java.io.File | Packages.java.net.URL, arguments: any): void;
// these two are commented out because it's useless, doesn't even show in game log
// declare function print(...arg: any[]): void;
// declare function printErr(...arg: any[]): void;

/**
 * Information about the graal runner.
 * Can someone tell me if this should be a namespace, I thought since it only had values in it, it would be best to declare this way.
 */
declare const Graal: {

    readonly language: string;
    readonly versionGraalVM: string;
    readonly versionECMAScript: number;

    isGraalRuntime(): boolean;

}

/**
 * This would be a namespace as well, but export/import are reserved terms in typescript
 */
declare const Polyglot: {

    import(key: string): any;
    export(key: string, value: any): void;
    eval(languageId: string, sourceCode: string): any;
    evalFile(languageId: string, sourceFileName: string): () => any;

}

/**
 * Java namespace for graal's Java functions.
 */
declare namespace Java {

    export function type<C extends JavaTypeList>(className: C): GetJavaType<C>;
    export function from<T>(javaData: JavaArray<T>): T[];
    export function from<T>(javaData: JavaList<T>): T[];
    export function from<T>(javaData: JavaCollection<T>): T[];
    export function to<T>(jsArray: T[]): JavaArray<T>;
    export function to<T extends JavaObject>(jsData: object, toType: JavaClass<T>): T; // does this really exist
    export function isJavaObject(obj: JavaObject): boolean;
    export function isType(obj: JavaClass): boolean;
    export function typeName(obj: JavaObject): string | undefined;
    export function isJavaFunction(fn: JavaObject): boolean;
    export function isScriptObject(obj: any): boolean;
    export function isScriptFunction(fn: Function): boolean;
    export function addToClasspath(location: string): void;

}

type JavaTypeList = ListPackages<typeof Packages> | string & {};

type ListPackages<T, P extends string = ''> =
    IsStrictAny<T> extends true ? never : T extends new (...args: any[]) => any ? P :
    { [K in keyof T]: ListPackages<T[K], P extends '' ? K : `${P}.${string & K}`> }[keyof T];

type GetJavaType<P extends string, T = typeof Packages> =
    IsStrictAny<T> extends true ? unknown :
    P extends `${infer K}.${infer R}` ? GetJavaType<R, T[K]> :
    P extends '' ? T extends new (...args: any[]) => any ? T : unknown : GetJavaType<'', T[P]>;

type UnionToIntersection<U> =
    (U extends any ? (k: U) => 0 : never) extends ((k: infer I) => 0) ? I : never;

type IsStrictAny<T> = UnionToIntersection<T extends never ? 1 : 0> extends never ? true : false;

declare const java:   JavaPackage<typeof Packages.java>;
declare const javafx: JavaPackage<typeof Packages.javafx>;
declare const javax:  JavaPackage<typeof Packages.javax>;
declare const com:    JavaPackage<typeof Packages.com>;
declare const org:    JavaPackage<typeof Packages.org>;
declare const edu:    JavaPackage<typeof Packages.edu>;

type JavaPackage<T> = (IsStrictAny<T> extends true ? unknown : T) & {
    /** java package, no constructor */
    new (none: never): never;
    /** @deprecated */ Symbol: unknown;
    /** @deprecated */ apply: unknown;
    /** @deprecated */ arguments: unknown;
    /** @deprecated */ bind: unknown;
    /** @deprecated */ call: unknown;
    /** @deprecated */ caller: unknown;
    /** @deprecated */ length: unknown;
    /** @deprecated */ name: unknown;
    /** @deprecated */ prototype: unknown;
};

type JavaInterfaceStatics = {
    /** interface, no constructor */
    new (none: never): never;
    /** @deprecated */ Symbol: unknown;
    /** @deprecated */ apply: unknown;
    /** @deprecated */ arguments: unknown;
    /** @deprecated */ bind: unknown;
    /** @deprecated */ call: unknown;
    /** @deprecated */ caller: unknown;
    /** @deprecated */ length: unknown;
    /** @deprecated */ name: unknown;
    /** @deprecated */ prototype: unknown;
};

type JavaClassStatics<Constructs extends boolean | object, Args extends [any, ...any] = []> =
    Constructs extends false ? {
        /** no constructor */
        new (none: never): never;
        /** @deprecated */ Symbol: unknown;
        /** @deprecated */ apply: unknown;
        /** @deprecated */ arguments: unknown;
        /** @deprecated */ bind: unknown;
        /** @deprecated */ call: unknown;
        /** @deprecated */ caller: unknown;
        /** @deprecated */ length: unknown;
        /** @deprecated */ name: unknown;
        /** @deprecated */ prototype: unknown;
    } : Constructs extends true ? unknown : Args extends [any, ...any] ? {
        new (...args: Args): Constructs;
        /** @deprecated */ Symbol: unknown;
        /** @deprecated */ apply: unknown;
        /** @deprecated */ arguments: unknown;
        /** @deprecated */ bind: unknown;
        /** @deprecated */ call: unknown;
        /** @deprecated */ caller: unknown;
        /** @deprecated */ length: unknown;
        /** @deprecated */ name: unknown;
        /** @deprecated */ prototype: unknown;
    } : {
        new (): Constructs;
        /** @deprecated */ Symbol: unknown;
        /** @deprecated */ apply: unknown;
        /** @deprecated */ arguments: unknown;
        /** @deprecated */ bind: unknown;
        /** @deprecated */ call: unknown;
        /** @deprecated */ caller: unknown;
        /** @deprecated */ length: unknown;
        /** @deprecated */ name: unknown;
        /** @deprecated */ prototype: unknown;
    }

type MergeClass<T> = new () => T;

declare namespace Packages {

    namespace java {

        namespace lang {

            const Class: JavaClassStatics<false> & {

                forName(className: string): JavaClass<any>;
                forName(name: string, initialize: boolean, loader: ClassLoader): JavaClass<any>;
                forName(module: Module, name: string): JavaClass<any>;

            };
            interface Class<T> extends Object {}

            interface Object {

                getClass(): JavaClass<JavaObject>;
                hashCode(): number;
                equals(obj: JavaObject): object;
                toString(): string;
                notify(): void;
                notifyAll(): void;
                wait(): void;
                wait(var1: number): void;
                wait(timeoutMillis: number, nanos: number): void;

            }

            interface Comparable<T> {

                compareTo(arg0: T): number;

            }

            interface Array<T> extends JsArray<T> {}

            const StackTraceElement: JavaClassStatics<true> & {

                new (declaringClass: string, methodName: string, fileName: string, lineNumber: number): StackTraceElement;
                new (classLoaderName: string, moduleName: string, moduleVersion: string, declaringClass: string, methodName: string, fileName: string, lineNumber: number): StackTraceElement;

                /** @deprecated */ Symbol: unknown;
                /** @deprecated */ apply: unknown;
                /** @deprecated */ arguments: unknown;
                /** @deprecated */ bind: unknown;
                /** @deprecated */ call: unknown;
                /** @deprecated */ caller: unknown;
                /** @deprecated */ length: unknown;
                /** @deprecated */ name: unknown;
                /** @deprecated */ prototype: unknown;

            };
            interface StackTraceElement extends Object, java.io.Serializable {

                getFileName(): string;
                getLineNumber(): number;
                getClassName(): string;
                getMethodName(): string;
                isNativeMethod(): boolean;
                toString(): string;
                equals(arg0: any): boolean;
                hashCode(): number;

            }

            const Throwable: JavaClassStatics<true> & {

                new (): Throwable;
                new (message: string): Throwable;
                new (message: string, cause: Throwable): Throwable;

                /** @deprecated */ Symbol: unknown;
                /** @deprecated */ apply: unknown;
                /** @deprecated */ arguments: unknown;
                /** @deprecated */ bind: unknown;
                /** @deprecated */ call: unknown;
                /** @deprecated */ caller: unknown;
                /** @deprecated */ length: unknown;
                /** @deprecated */ name: unknown;
                /** @deprecated */ prototype: unknown;

            };
            interface Throwable extends Object, java.io.Serializable, Error {

                getMessage(): string;
                getLocalizedMessage(): string;
                getCause(): Throwable;
                initCause(arg0: Throwable): Throwable;
                toString(): string;
                fillInStackTrace(): Throwable;
                getStackTrace(): Array<StackTraceElement>;
                setStackTrace(arg0: Array<StackTraceElement>): void;
                addSuppressed(arg0: Throwable): void;
                getSuppressed(): Array<Throwable>;

            }

            interface Iterable<T> extends JsIterable<T> {

                iterator(): java.util.Iterator<T>;
                forEach(arg0: java.util._function.Consumer<any>): void;
                spliterator(): java.util.Spliterator<T>;

            }

        }

        namespace util {

            interface Collection<T> extends java.lang.Iterable<T> {

                readonly [n: number]: T;

                add(element: T): boolean;
                addAll(elements: JavaCollection<T>): boolean;
                clear(): void;
                contains(element: T): boolean;
                containsAll(elements: JavaCollection<T>): boolean;
                equals(object: JavaCollection<T>): boolean;
                hashCode(): number;
                isEmpty(): boolean;
                iterator(): Iterator<T>;
                remove(element: T): boolean;
                removeAll(elements: JavaCollection<T>): boolean;
                retainAll(elements: JavaCollection<T>): boolean;
                size(): number;
                toArray(): T[];

            }

            const List: JavaClassStatics<false> & {

                copyOf<T>(coll: JavaCollection<T>): JavaList<T>;
                of<T>(...elements: T[]): JavaList<T>;

            };
            interface List<T> extends Collection<T> {

                add(index: number, element: T): void;
                add(element: T): boolean;
                addAll(index: number, elements: JavaCollection<T>): boolean;
                addAll(elements: JavaCollection<T>): boolean;
                get(index: number): T;
                indexOf(element: T): number;
                lastIndexOf(element: T): number;
                remove(index: number): T;
                remove(element: T): boolean;
                set(index: number, element: T): T;
                subList(start: number, end: number): JavaList<T>;

            }

            const Map: JavaClassStatics<false> & {

                copyOf<K, V>(coll: JavaMap<K, V>): JavaMap<K, V>;
                entry<K, V>(k: K, v: V): Map$Entry<K, V>;
                ofEntries<K, V>(...entries: Map$Entry<K, V>[]): JavaMap<K, V>;
                of<K, V>(k1: K, v1: V): JavaMap<K, V>;
                of<K, V>(k1: K, v1: V, k2: K, v2: V): JavaMap<K, V>;
                of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V): JavaMap<K, V>;
                of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V, k4: K, v4: V): JavaMap<K, V>;
                of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V, k4: K, v4: V, k5: K, v5: V): JavaMap<K, V>;
                of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V, k4: K, v4: V, k5: K, v5: V, k6: K, v6: V): JavaMap<K, V>;
                of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V, k4: K, v4: V, k5: K, v5: V, k6: K, v6: V, k7: K, v7: V): JavaMap<K, V>;
                of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V, k4: K, v4: V, k5: K, v5: V, k6: K, v6: V, k7: K, v7: V, k8: K, v8: V): JavaMap<K, V>;
                of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V, k4: K, v4: V, k5: K, v5: V, k6: K, v6: V, k7: K, v7: V, k8: K, v8: V, k9: K, v9: V): JavaMap<K, V>;
                of<K, V>(k1: K, v1: V, k2: K, v2: V, k3: K, v3: V, k4: K, v4: V, k5: K, v5: V, k6: K, v6: V, k7: K, v7: V, k8: K, v8: V, k9: K, v9: V, k10: K, v10: V): JavaMap<K, V>;

            };
            interface Map<K, V> {

                [key: string | number]: V;

                clear(): void;
                containsKey(key: K): boolean;
                containsValue(value: V): boolean;
                entrySet(): JavaSet<Map$Entry<K, V>>;
                equals(object: JavaMap<K, V>): boolean;
                get(key: K): V | null;
                getOrDefault(key: K, defaultValue: V): V;
                hashCode(): number;
                isEmpty(): boolean;
                keySet(): JavaSet<K>;
                put(ket: K, value: V): V;
                putAll(map: JavaMap<K, V>): void;
                putIfAbsent(key: K, value: V): V | null;
                remove(key: K): V | null;
                remove(key: K, value: V): boolean;
                replace(key: K, value: V): V;
                replace(key: K, oldValue: V, newValue: V): boolean;
                size(): number;
                values(): JavaCollection<V>;

            }

            const Set: JavaClassStatics<false> & {

                copyOf<T>(coll: JavaCollection<T>): JavaSet<T>;
                of<T>(...elements: T[]): JavaSet<T>;

            };
            interface Set<T> extends Collection<T> {}

        }

        namespace io {

            const File: JavaClassStatics<true> & {

                new (pathName: string): File;
                new (parent: string, child: string): File;
                new (parent: File, child: string): File;
                new (uri: java.net.URI): File;

                /** @deprecated */ Symbol: unknown;
                /** @deprecated */ apply: unknown;
                /** @deprecated */ arguments: unknown;
                /** @deprecated */ bind: unknown;
                /** @deprecated */ call: unknown;
                /** @deprecated */ caller: unknown;
                /** @deprecated */ length: unknown;
                /** @deprecated */ name: unknown;
                /** @deprecated */ prototype: unknown;

                listRoots(): JavaArray<File>;

            };
            interface File extends JavaObject {

                canExecute(): boolean;
                canRead(): boolean;
                canWrite(): boolean;
                createNewFile(): boolean;
                delete(): boolean;
                deleteOnExit(): void;
                exists(): boolean;
                getAbsolutePath(): string;
                getCanonicalPath(): string;
                getName(): string;
                getParent(): string;
                getPath(): string;
                isAbsolute(): boolean;
                isDirectory(): boolean;
                isFile(): boolean;
                isHidden(): boolean;
                length(): number;
                list(): JavaArray<string>;
                listFiles(): JavaArray<File>;
                mkdir(): boolean;
                mkdirs(): boolean;
                renameTo(dest: File): boolean;
                setExecutable(executable: boolean, ownerOnly?: boolean): boolean;
                setLastModified(time: number);
                setReadable(readable: boolean, ownerOnly?: boolean): boolean;
                setWritable(writable: boolean, ownerOnly?: boolean): boolean;
                toString(): string;
                toURI(): java.net.URI;

            }

            interface Serializable {}

        }

        namespace net {

            const URL: JavaClassStatics<true> & {

                new (protocol: string, host: string, port: number, file: string): URL;
                new (protocol: string, host: string, file: string): URL;
                new (spec: string): URL;
                new (context: URL, spec: string): URL;

                /** @deprecated */ Symbol: unknown;
                /** @deprecated */ apply: unknown;
                /** @deprecated */ arguments: unknown;
                /** @deprecated */ bind: unknown;
                /** @deprecated */ call: unknown;
                /** @deprecated */ caller: unknown;
                /** @deprecated */ length: unknown;
                /** @deprecated */ name: unknown;
                /** @deprecated */ prototype: unknown;

            };
            interface URL extends java.lang.Object {

                getFile(): string;
                getPath(): string;
                getProtocol(): string;
                getRef(): string;
                getQuery(): string;
                toString(): string;
                toURI(): URI;

            }

            const URI: JavaClassStatics<true> & {

                new (str: string): URI;
                new (scheme: string, userInfo: string, host: string, port: number, path: string, query: string, fragment: string): URI;
                new (scheme: string, authority: string, path: string, query: string, fragment: string): URI;
                new (scheme: string, host: string, path: string, fragment: string): URI;
                new (scheme: string, ssp: string, fragment: string): URI;
                new (scheme: string, path: string): URI;

                /** @deprecated */ Symbol: unknown;
                /** @deprecated */ apply: unknown;
                /** @deprecated */ arguments: unknown;
                /** @deprecated */ bind: unknown;
                /** @deprecated */ call: unknown;
                /** @deprecated */ caller: unknown;
                /** @deprecated */ length: unknown;
                /** @deprecated */ name: unknown;
                /** @deprecated */ prototype: unknown;

                create(str: string): URI;

            };
            interface URI extends java.lang.Object, java.lang.Comparable<URI>, java.io.Serializable {

                getHost(): string;
                getPath(): string;
                getPort(): number;
                getQuery(): string;
                getScheme(): string;
                normalize(): URI;
                relativize(uri: URI): URI;
                resolve(str: string): URI;
                toASCIIString(): string;
                toString(): string;
                toURL(): URL;

            }

        }

    }

    namespace net {

        export const minecraft: any;

    }

}

type JsArray<T> = T[];
type JsIterable<T> = Iterable<T>;

type _  = { [none: symbol]: never }; // to trick vscode to rename types
type _r = { [none: symbol]: never };

type JavaObject                    = Packages.java.lang.Object & _;
type JavaClass<T = any>            = Packages.java.lang.Class<T>;
type JavaArray<T = any>            = Packages.java.lang.Array<T>;
type JavaCollection<T = any>       = Packages.java.util.Collection<T>;
type JavaList<T = any>             = Packages.java.util.List<T>;
type JavaSet<T = any>              = Packages.java.util.Set<T>;
type JavaMap<K = any, V = any>     = Packages.java.util.Map<K, V>;
